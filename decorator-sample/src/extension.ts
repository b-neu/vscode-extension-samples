import * as vscode from 'vscode';
import {Position} from "vscode";

// This method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {

	const decorationType = vscode.window.createTextEditorDecorationType({
		borderWidth: '1px',
		borderStyle: 'solid',
		overviewRulerColor: 'blue',
		overviewRulerLane: vscode.OverviewRulerLane.Center,
		backgroundColor: "darkred",
		light: {
			borderColor: 'darkblue'
		},
		dark: {
			borderColor: 'lightblue'
		}
	});

	vscode.window.onDidChangeTextEditorSelection(event => {
		updateDecorations(event);
	}, null, context.subscriptions);

	function updateDecorations(event) {
		const activeEditor = event.textEditor;
		const selections = event.selections;
		if (!selections || selections.length < 1) {
			return;
		}

		// These variables are currently unused, but are proof
		// of concept that we can get the currently highlighted text
		const range = selections[0].with();
		const text = activeEditor.document.getText(range);
		console.log(text);

		// Currently hard-coding lines numbers here, but
		// we can easily change this to whatever we want.
		const startPos = new Position(545, 0);
		const endPos = new Position(553, 0);

		const newRange = new vscode.Range(startPos, endPos);
		activeEditor.setDecorations(decorationType, [newRange]);
	}
}

