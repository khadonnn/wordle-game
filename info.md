\*khong them row vao thi khong xuong hang
useEffect(() => {
const handleKeyDown = (e: KeyboardEvent) => {
handleKeyInput(e.key);
};
window.addEventListener('keydown', handleKeyDown);
return () => window.removeEventListener('keydown', handleKeyDown);
}, [board, position, row]);
