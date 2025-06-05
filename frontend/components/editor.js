"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { Text } from '@tiptap/extension-text';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import html2pdf from 'html2pdf.js';
import { CustomDocument, SceneHeading, Character, Dialogue, Transition, Action } from '@/lib/customNodes'


const ScreenplayEditor = ({ screenplay, screenplayID }) => {
  const { token, loading: authLoading } = useContext(AuthContext);
  const [title, setTitle] = useState(screenplay?.title || 'Untitled Screenplay');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

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
    content: screenplay?.content || {
      type: 'doc',
      content: [
        {
          type: 'sceneHeading',
          content: [{ type: 'text', text: 'INT. LOCATION - DAY' }],
        },
        {
          type: 'action',
          content: [{ type: 'text', text: 'Start your screenplay here.' }],
        },
      ],
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none pt-[4ch] pb-[10ch] ml-[10ch] w-[64ch] min-h-[116ch]',
      },
    },
  });

  useEffect(() => {
    if (editor && screenplay?.content) {
      editor.commands.setContent(screenplay.content);
    }
  }, [editor, screenplay]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  const saveScreenplay = async () => {
    if (authLoading) return;
    if (!token) {
      setError('Please log in to save');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const content = editor.getJSON();
      await axios.put(
          `http://localhost:4000/api/docs/${screenplayID}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save screenplay');
    } finally {
      setSaving(false);
    }
  };

  const exportPDF = () => {
    const editorContainer = document.querySelector('.exportable-screenplay');
    if (editorContainer) {
      html2pdf().set({
        margin: 0,
        filename: `${title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .from(editorContainer)
      .save();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div >
      
      <div className="h-10  flex gap-2 pl-2 pr-2 sticky top-0 bg-gray-100 z-50 ">
        
        <button
          onClick={saveScreenplay}
          disabled={saving}
          className={`px-2 my-1 bg-gray-300 hover:bg-gray-400  ${saving ? 'opacity-50' : ''}`}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={exportPDF}
          className="px-2 my-1 bg-gray-300 hover:bg-gray-400 "
        >
          Export
        </button>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border-gray-400 rounded bg-white text-2xl my-1"
          placeholder="Screenplay Title"
        />
        <div className=" flex gap-2 flex-row items-center bg-gray-100 ">
          <button
            onClick={() => editor.chain().focus().setNode('sceneHeading').run()}
            className={`px-2 py-1 ${editor.isActive('sceneHeading') ? 'bg-gray-300' : 'bg-gray-100'}`}
          >
            Scene
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
      </div>
      
      
      <div className='flex justify-center bg-gray-50 pt-4'>
        <div className='exportable-screenplay w-[97ch] pt-[6ch] pl-[10ch] mb-20 bg-white outline-1 outline-white shadow-xl'>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default ScreenplayEditor;