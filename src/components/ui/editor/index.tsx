'use client'

import { MenuBar } from '@/components/ui/editor/menu-bar'
import { cn } from '@/lib/utils'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface EditorProps {
  value: string
  onChange?: (value: string) => void
  className?: string
}

export const Editor = ({ value, onChange, className }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-full p-4',
      },
    },
    onCreate({ editor }) {
      onChange?.(editor.getHTML())
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
    autofocus: false,
  })

  useEffect(() => {
    const editorHTML = editor?.getHTML()

    if (editorHTML !== value) {
      setTimeout(() => {
        editor?.commands.setContent(value)
      })
    }
  }, [value])

  return (
    <div
      className={cn(
        'bg-background border border-muted rounded-2xl w-full felx flex-col',
        className,
      )}
    >
      <MenuBar editor={editor} />
      <div className="h-full [&>div]:h-full flex flex-col overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
