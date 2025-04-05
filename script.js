// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Mouse controls
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Event listeners
document.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    
    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };
    
    cube.rotation.y += deltaMove.x * 0.01;
    cube.rotation.x += deltaMove.y * 0.01;
    
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

document.addEventListener('click', () => {
    cube.material.color.setHex(Math.random() * 0xffffff);
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
