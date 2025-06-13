import { Editor, MarkdownView, Plugin } from 'obsidian';

export default class TaskopaminePlugin extends Plugin {
	async onload() {
		// Register the event listener for task completion
		this.registerEvent(
			this.app.workspace.on('editor-change', (editor: Editor, view: MarkdownView) => {
				const cursor = editor.getCursor();
				const line = editor.getLine(cursor.line);
				// Check if the line contains a task that was just completed
				if (line.match(/^[\s-]*\[x\]/)) {
					this.triggerCelebration();
				}
			})
		);
	}

	onunload() {
		document.querySelectorAll('.celebration-container').forEach(el => el.remove());
	}

	private triggerCelebration() {
		const container = document.createElement('div');
		container.className = 'celebration-container';
		for (let i = 0; i < 13; i++) {
			const confetti = document.createElement('div');
			confetti.className = 'confetti';
			container.appendChild(confetti);
		}
		for (let i = 0; i < 9; i++) {
			const sparkle = document.createElement('div');
			sparkle.className = 'sparkle';
			container.appendChild(sparkle);
		}
		document.body.appendChild(container);
		setTimeout(() => {
			container.remove();
		}, 3000);
	}
}
