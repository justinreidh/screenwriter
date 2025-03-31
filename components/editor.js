"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { Node } from '@tiptap/core';
import { Document } from '@tiptap/extension-document'; 
import { Text } from '@tiptap/extension-text';
import { useEffect } from 'react';


const CustomDocument = Document.extend({
  content: 'block+', 
});

const SceneHeading = Node.create({
  name: 'sceneHeading',
  group: 'block',
  content: 'text*',
  defining: true,
  renderHTML({ HTMLAttributes }) {
    return ['h1', { ...HTMLAttributes, style: 'text-transform: uppercase; margin: 1em 0; text-align: left;' }, 0];
  },
  parseHTML() {
    return [{ tag: 'h1' }];
  },
});

const Character = Node.create({
  name: 'character',
  group: 'block',
  content: 'text*',
  defining: true,
  renderHTML({ HTMLAttributes }) {
    return ['p', { ...HTMLAttributes, style: 'text-align: center; text-transform: uppercase; margin: 0.5em 0;' }, 0];
  },
  parseHTML() {
    return [{ tag: 'p[data-type="character"]' }];
  },
});

const Dialogue = Node.create({
  name: 'dialogue',
  group: 'block',
  content: 'text*',
  defining: true,
  renderHTML({ HTMLAttributes }) {
    return ['p', { ...HTMLAttributes, style: 'margin-left: 2.5em; margin-right: 2.5em; margin-top: 0; margin-bottom: 1em;' }, 0];
  },
  parseHTML() {
    return [{ tag: 'p[data-type="dialogue"]' }];
  },
});

const Transition = Node.create({
  name: 'transition',
  group: 'block',
  content: 'text*',
  defining: true,
  renderHTML({ HTMLAttributes }) {
    return ['p', { ...HTMLAttributes, style: 'text-align: right; text-transform: uppercase; margin: 1em 0;' }, 0];
  },
  parseHTML() {
    return [{ tag: 'p[data-type="transition"]' }];
  },
});

const Action = Node.create({
  name: 'action',
  group: 'block',
  content: 'text*',
  defining: true,
  renderHTML({ HTMLAttributes }) {
    return ['p', { ...HTMLAttributes, style: 'margin: 0.5em 0;' }, 0];
  },
  parseHTML() {
    return [{ tag: 'p[data-type="action"]' }];
  },
});

const ScreenplayEditor = () => {
  const editor = useEditor({
    extensions: [
      CustomDocument, 
      Text,
      SceneHeading,
      Character,
      Dialogue,
      Transition,
      Action,
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
        class: 'prose prose-sm focus:outline-none font-mono max-w-2xl mx-auto',
      },
    },
  });

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
      <div className="mb-2 flex gap-2 flex-wrap">
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
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default ScreenplayEditor;