import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@components/shared/ui/button';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
} from 'lucide-react';

import { EditorData } from '@data/dummy';
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttons = [
    {
      icon: <Bold className="h-4 w-4" />,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      active: 'bold',
    },
    {
      icon: <Italic className="h-4 w-4" />,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      active: 'italic',
    },
    {
      icon: <Strikethrough className="h-4 w-4" />,
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      active: 'strike',
    },
    { type: 'divider' },
    {
      icon: <List className="h-4 w-4" />,
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: 'bulletList',
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: 'orderedList',
    },
    { type: 'divider' },
    {
      icon: <Quote className="h-4 w-4" />,
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: 'blockquote',
    },
    {
      icon: <Code className="h-4 w-4" />,
      title: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      active: 'codeBlock',
    },
    { type: 'divider' },
    {
      icon: <Undo className="h-4 w-4" />,
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo className="h-4 w-4" />,
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50 dark:bg-main-dark-bg dark:border-gray-700 sticky top-0 z-10">
      {buttons.map((btn, i) =>
        btn.type === 'divider' ? (
          <div
            key={i}
            className="w-px bg-gray-300 dark:bg-gray-700 mx-1 self-stretch"
          />
        ) : (
          <Button
            key={btn.title}
            variant={editor.isActive(btn.active) ? 'secondary' : 'ghost'}
            size="sm"
            onClick={btn.action}
            title={btn.title}
            className={`transition-all ${editor.isActive(btn.active) ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'dark:text-gray-200'}`}
          >
            {btn.icon}
          </Button>
        ),
      )}
    </div>
  );
};

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `${EditorData}`,
    editorProps: {
      attributes: {
        class:
          'focus:outline-none min-h-[400px] p-6 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert max-w-none',
      },
    },
  });

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl transition-colors duration-300">
      <div className="mb-8 flex justify-between items-center">
        <h3 className="text-3xl font-extrabold tracking-tight dark:text-white text-slate-900">
          Editor
        </h3>
        <Button
          onClick={() => console.log(editor.getHTML())}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Save Content
        </Button>
      </div>

      <div className="border rounded-xl overflow-hidden dark:border-gray-700 shadow-sm bg-white dark:bg-secondary-dark-bg">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex justify-end gap-4">
        <span>
          {(editor.storage as any).starterKit?.history?.depth || 0} words
        </span>
        <span>Character count: {editor?.getText().length}</span>
      </div>
    </div>
  );
};

export default Editor;
