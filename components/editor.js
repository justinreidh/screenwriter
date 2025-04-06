"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { Node } from '@tiptap/core';
import { Document } from '@tiptap/extension-document'; 
import { Text } from '@tiptap/extension-text';
import { useEffect, useState } from 'react';

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

const ScreenplayEditor = () => {
  const editor = useEditor({
    extensions: [
      CustomDocument, 
      Text,
      Action,
      SceneHeading,
      Character,
      Dialogue,
      Transition,
    ],
    content: `
      <h1>INT. LIVING ROOM - DAY</h1>
      <p data-type="action">A cozy room with sunlight streaming in.</p>
      <p data-type="character">JOHN</p>
      <p data-type="dialogue">Hey, how's it going?</p>
      <p data-type="transition">CUT TO:</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none pt-[4ch] font-mono ml-[10ch] w-[64ch] min-h-[116ch]',
      },
    },
  });

  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="mb-2 flex gap-2 flex-col items-center bg-gray-100 fixed right-0.5">
        <button
          onClick={() => editor.chain().focus().setNode('sceneHeading').run()}
          className={`px-2 py-1 ${editor.isActive('sceneHeading') ? 'bg-gray-300' : 'bg-gray-100'}`}
        >
          Scene Heading
        </button>
        <button
          onClick={() => editor.chain().focus().setNode('character').run()}
          className={`px-2 py-1 ${editor.isActive('character') ? 'bg-gray-300' : 'bg-gray-100'}`}
        >
          Character
        </button>
        <button
          onClick={() => editor.chain().focus().setNode('dialogue').run()}
          className={`px-2 py-1 ${editor.isActive('dialogue') ? 'bg-gray-300' : 'bg-gray-100'}`}
        >
          Dialogue
        </button>
        <button
          onClick={() => editor.chain().focus().setNode('transition').run()}
          className={`px-2 py-1 ${editor.isActive('transition') ? 'bg-gray-300' : 'bg-gray-100'}`}
        >
          Transition
        </button>
        <button
          onClick={() => editor.chain().focus().setNode('action').run()}
          className={`px-2 py-1 ${editor.isActive('action') ? 'bg-gray-300' : 'bg-gray-100'}`}
        >
          Action
        </button>
        <div className="relative">
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="px-2 py-1 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center"
            title="Keyboard Shortcuts"
          >
            <span className="text-sm">i</span>
          </button>
          {showShortcuts && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4 z-10">
              <h3 className="font-bold mb-2">Keyboard Shortcuts</h3>
              <ul className="text-sm">
                <li className="mb-1"><kbd>Ctrl/Cmd + S</kbd> - Scene Heading</li>
                <li className="mb-1"><kbd>Ctrl/Cmd + C</kbd> - Character</li>
                <li className="mb-1"><kbd>Ctrl/Cmd + D</kbd> - Dialogue</li>
                <li className="mb-1"><kbd>Ctrl/Cmd + X</kbd> - Transition</li>
                <li className="mb-1"><kbd>Ctrl/Cmd + A</kbd> - Action</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='w-[97ch] pt-[6ch] pl-[10ch] outline-1'>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default ScreenplayEditor;