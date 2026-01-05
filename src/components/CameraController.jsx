import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { easing } from 'maath';

export default function CameraController({ activeSection }) {
    const { camera, viewport } = useThree();
    const isMobile = viewport.width < 5; // Roughly < 768px in 3D units depending on FOV

    useFrame((state, delta) => {
        // Base positions for different sections - Responsive!
        const targetPos = new Vector3(0, 0, 7); // Default overview
        const targetLookAt = new Vector3(0, 0, 0);

        if (activeSection === 'about') {
            // Mobile: Zoom out a bit more than destkop to fit text
            targetPos.set(isMobile ? 0 : -2, isMobile ? 2 : 1, isMobile ? 6 : 4);
            targetLookAt.set(0, 0, 0);
        } else if (activeSection === 'projects') {
            // Mobile: Move back to center, desktop: side view
            // On mobile, we might want to just push back to let the list take over center
            targetPos.set(isMobile ? 0 : 4, isMobile ? -1 : 0, isMobile ? 8 : 5);
            targetLookAt.set(isMobile ? 0 : -1, 0, 0);
        } else if (activeSection === 'contact') {
            targetPos.set(0, isMobile ? -2 : -3, 6);
            targetLookAt.set(0, 2, 0);
        }

        // Add subtle parallax based on mouse (Reduced on mobile)
        const parallaxStrength = isMobile ? 0.1 : 0.5;
        targetPos.x += (state.pointer.x * parallaxStrength);
        targetPos.y += (state.pointer.y * parallaxStrength);

        // Smoothly move camera position with refined smoothing strength
        easing.damp3(camera.position, targetPos, 0.4, delta);

        // Handle rotation smoothing
        if (!state.camera.userData.focusPoint) {
            state.camera.userData.focusPoint = new Vector3(0, 0, 0);
        }

        easing.damp3(state.camera.userData.focusPoint, targetLookAt, 0.4, delta);
        camera.lookAt(state.camera.userData.focusPoint);
    });

    return null;
}
