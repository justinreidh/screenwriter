import { Node } from '@tiptap/core';
import { Document } from '@tiptap/extension-document'; 

const CustomDocument = Document.extend({
  content: 'block+', 
});

const SceneHeading = Node.create({
  name: 'sceneHeading',
  group: 'block',
  content: 'text*',
  defining: true,
  renderHTML({ HTMLAttributes }) {
    return ['h1', { ...HTMLAttributes, class: "text-left uppercase mb-[2ch]" }, 0];
  },
  parseHTML() {
    return [{ tag: 'h1' }];
  },
  addKeyboardShortcuts() {
    return {
      'Mod-S': () => {
        return this.editor.commands.toggleNode(this.name, 'action')
      }
    }
  },
});

const Character = Node.create({
  name: 'character',
  group: 'block',
  content: 'text*',
  defining: true,
  renderHTML({ HTMLAttributes }) {
    return ['p', { ...HTMLAttributes, class: "ml-[20ch] w-[34ch]" }, 0];
  },
  parseHTML() {
    return [{ tag: 'p[data-type="character"]' }];
  },
  addKeyboardShortcuts() {
    return {
      'Mod-C': () => {
        return this.editor.commands.toggleNode(this.name, 'action')
      }
    }
  },
});

const Dialogue = Node.create({
  name: 'dialogue',
  group: 'block',
  content: 'text*',
  defining: true,
  renderHTML({ HTMLAttributes }) {
    return ['p', { ...HTMLAttributes, class: "ml-[10ch] w-[34ch] mb-[2ch]" }, 0];
  },
  parseHTML() {
    return [{ tag: 'p[data-type="dialogue"]' }];
  },
  addKeyboardShortcuts() {
    return {
      'Mod-D': () => {
        return this.editor.commands.toggleNode(this.name, 'action')
      }
    }
  },
});

const Transition = Node.create({
  name: 'transition',
  group: 'block',
  content: 'text*',
  defining: true,
  renderHTML({ HTMLAttributes }) {
    return ['p', { ...HTMLAttributes, class: "text-right uppercase mb-[2ch]" }, 0];
  },
  parseHTML() {
    return [{ tag: 'p[data-type="transition"]' }];
  },
  addKeyboardShortcuts() {
    return {
      'Mod-X': () => {
        return this.editor.commands.toggleNode(this.name, 'action')
      }
    }
  },
});

const Action = Node.create({
  name: 'action',
  group: 'block',
  content: 'text*',
  defining: true,
  renderHTML({ HTMLAttributes }) {
    return ['p', { ...HTMLAttributes, class: "mb-[2ch]" }, 0];
  },
  parseHTML() {
    return [{ tag: 'p[data-type="action"]' }];
  },
  addKeyboardShortcuts() {
    return {
      'Mod-A': () => {
        return this.editor.commands.toggleNode(this.name, 'action')
      }
    }
  },
});

export {CustomDocument, SceneHeading, Character, Dialogue, Transition, Action}