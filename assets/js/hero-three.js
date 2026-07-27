// Hero-Agentenfeld — wird erst nach dem Laden der Seite und im Leerlauf
// initialisiert, damit es die erste Darstellung und die Interaktivität
// (Total Blocking Time) nicht beeinträchtigt. Three.js wird dabei dynamisch
// nachgeladen und nur, wenn es wirklich gebraucht wird.

const canvas = document.getElementById('hero-agent-field');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!canvas || prefersReducedMotion) {
  document.documentElement.classList.add(prefersReducedMotion ? 'reduced-motion' : 'no-webgl');
} else {
  const start = () => {
    const run = () => initHeroField(canvas);
    if ('requestIdleCallback' in window) {
      requestIdleCallback(run, { timeout: 2000 });
    } else {
      setTimeout(run, 200);
    }
  };
  if (document.readyState === 'complete') {
    start();
  } else {
    window.addEventListener('load', start, { once: true });
  }
}

async function initHeroField(canvas) {
  let THREE;
  try {
    // Three.js wird lokal ausgeliefert (Self-Hosting, DSGVO-konform).
    // Hinweis: three.module.min.js importiert intern three.core.min.js —
    // beide Dateien müssen gemeinsam unter assets/js/vendor/ liegen.
    //
    // WICHTIG: Ein relativer Specifier wird gegen die URL DIESES Moduls
    // aufgelöst (assets/js/), nicht gegen die URL der HTML-Seite.
    // Deshalb './vendor/...' und nicht './assets/js/vendor/...'.
    THREE = await import('./vendor/three.module.min.js');
  } catch (error) {
    console.warn('[hero] three.js konnte nicht geladen werden:', error);
    document.documentElement.classList.add('no-webgl');
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (error) {
    document.documentElement.classList.add('no-webgl');
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 8.2);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const group = new THREE.Group();
  group.position.set(1.55, 0.08, 0);
  scene.add(group);

  const nodeCount = 54;
  const nodePositions = [];
  const nodeArray = new Float32Array(nodeCount * 3);

  for (let i = 0; i < nodeCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const radius = 1.15 + Math.random() * 2.6;
    const y = (Math.random() - 0.5) * 3.35;
    const x = Math.cos(theta) * radius * 1.22;
    const z = Math.sin(theta) * radius * 0.82;
    nodePositions.push(new THREE.Vector3(x, y, z));
    nodeArray[i * 3] = x;
    nodeArray[i * 3 + 1] = y;
    nodeArray[i * 3 + 2] = z;
  }

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodeArray, 3));

  const nodeMaterial = new THREE.PointsMaterial({
    color: 0xf4f6fa,
    size: 0.052,
    transparent: true,
    opacity: 0.76,
    depthWrite: false
  });

  const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
  group.add(nodes);

  const linePositions = [];
  const maxDistance = 1.18;
  for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
      const distance = nodePositions[i].distanceTo(nodePositions[j]);
      if (distance < maxDistance && Math.random() > 0.35) {
        linePositions.push(
          nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
          nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
        );
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xb8c2d0,
    transparent: true,
    opacity: 0.15,
    depthWrite: false
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lines);

  const coreGeometry = new THREE.IcosahedronGeometry(0.92, 2);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.115,
    depthWrite: false
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(core);

  const ringOne = new THREE.Mesh(
    new THREE.TorusGeometry(1.62, 0.006, 12, 108),
    new THREE.MeshBasicMaterial({ color: 0xb8c2d0, transparent: true, opacity: 0.16, depthWrite: false })
  );
  ringOne.rotation.x = Math.PI / 2.8;
  group.add(ringOne);

  const ringTwo = new THREE.Mesh(
    new THREE.TorusGeometry(2.22, 0.004, 12, 128),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.075, depthWrite: false })
  );
  ringTwo.rotation.y = Math.PI / 2.35;
  ringTwo.rotation.x = Math.PI / 9;
  group.add(ringTwo);

  const pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.18;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.18;
  }, { passive: true });

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);

    const isCompact = width < 1024;
    group.position.x = isCompact ? 1.15 : 1.55;
    group.scale.setScalar(isCompact ? 0.82 : 1);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Renderloop nur laufen lassen, wenn der Hero sichtbar ist — spart CPU.
  let running = false;
  const loop = (time) => {
    const t = time * 0.00014;
    group.rotation.y = t + pointer.x;
    group.rotation.x = Math.sin(t * 1.45) * 0.08 + pointer.y;
    core.rotation.y = time * 0.00022;
    core.rotation.x = time * 0.00016;
    ringOne.rotation.z = time * 0.00018;
    ringTwo.rotation.z = -time * 0.00012;
    nodes.rotation.y = Math.sin(t * 1.3) * 0.05;
    renderer.render(scene, camera);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      const visible = entries[0].isIntersecting;
      if (visible && !running) {
        running = true;
        renderer.setAnimationLoop(loop);
      } else if (!visible && running) {
        running = false;
        renderer.setAnimationLoop(null);
      }
    }, { threshold: 0 });
    io.observe(canvas);
  } else {
    renderer.setAnimationLoop(loop);
  }
}
