export const handleKeyDown = (
	e: React.KeyboardEvent<HTMLInputElement>,
	callback: () => void
) => {
	if (e.key === 'Enter') {
		callback()
	}
}
