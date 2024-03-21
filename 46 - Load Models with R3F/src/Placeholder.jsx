export default function Placeholder(props) {
  return (
    <mesh {...props}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial wireframe color="#d3d3d3" />
    </mesh>
  );
}
