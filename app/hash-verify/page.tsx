'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Plus, Save, Trash2 } from 'lucide-react'

interface FileData {
  id: string
  name: string
  content: string
  hash: string
  lastSaved: number
}

async function computeHash(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function HashVerifyPage() {
  const [files, setFiles] = useState<FileData[]>([])
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [currentContent, setCurrentContent] = useState('')
  const [currentHash, setCurrentHash] = useState('')
  const [isModified, setIsModified] = useState(false)
  const [newFileName, setNewFileName] = useState('')

  // Load files from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('file-system')
    if (stored) {
      const loadedFiles = JSON.parse(stored) as FileData[]
      setFiles(loadedFiles)
    }
  }, [])

  // Save files to localStorage whenever they change
  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem('file-system', JSON.stringify(files))
    }
  }, [files])

  // Compute hash and check for modifications
  useEffect(() => {
    async function checkModification() {
      const hash = await computeHash(currentContent)
      setCurrentHash(hash)

      if (selectedFileId) {
        const selectedFile = files.find((f) => f.id === selectedFileId)
        if (selectedFile) {
          setIsModified(hash !== selectedFile.hash)
        }
      }
    }

    checkModification()
  }, [currentContent, selectedFileId, files])

  const createNewFile = () => {
    if (!newFileName.trim()) return

    const newFile: FileData = {
      id: Date.now().toString(),
      name: newFileName.trim(),
      content: '',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // empty string hash
      lastSaved: Date.now(),
    }

    setFiles([...files, newFile])
    setSelectedFileId(newFile.id)
    setCurrentContent('')
    setNewFileName('')
  }

  const selectFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId)
    if (file) {
      setSelectedFileId(file.id)
      setCurrentContent(file.content)
    }
  }

  const saveFile = async () => {
    if (!selectedFileId) return

    const hash = await computeHash(currentContent)
    setFiles(
      files.map((f) =>
        f.id === selectedFileId
          ? { ...f, content: currentContent, hash, lastSaved: Date.now() }
          : f
      )
    )
    setIsModified(false)
  }

  const deleteFile = (fileId: string) => {
    setFiles(files.filter((f) => f.id !== fileId))
    if (selectedFileId === fileId) {
      setSelectedFileId(null)
      setCurrentContent('')
    }
  }

  const selectedFile = files.find((f) => f.id === selectedFileId)

  return (
    <div className='container mx-auto py-10 px-4'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>File System Simulator</h1>
        <p className='text-muted-foreground'>
          Create files and see how hash verification detects modifications
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* File List Sidebar */}
        <Card className='md:col-span-1'>
          <CardHeader>
            <CardTitle>Files</CardTitle>
            <CardDescription>Your virtual file system</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* Create new file */}
            <div className='space-y-2'>
              <Label htmlFor='new-file-name'>New File</Label>
              <div className='flex gap-2'>
                <Input
                  id='new-file-name'
                  placeholder='filename.txt'
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') createNewFile()
                  }}
                />
                <Button onClick={createNewFile} size='icon'>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* File list */}
            <div className='space-y-2'>
              {files.length === 0 ? (
                <p className='text-sm text-muted-foreground text-center py-4'>
                  No files yet. Create one!
                </p>
              ) : (
                files.map((file) => (
                  <div key={file.id} className='flex items-center gap-2 group'>
                    <Button
                      variant={
                        selectedFileId === file.id ? 'default' : 'outline'
                      }
                      className='flex-1 justify-start truncate'
                      onClick={() => selectFile(file.id)}>
                      {file.name}
                    </Button>
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() => deleteFile(file.id)}
                      className='opacity-0 group-hover:opacity-100 transition-opacity'>
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* File Editor */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>
                  {selectedFile ? selectedFile.name : 'No file selected'}
                </CardTitle>
                <CardDescription>
                  {selectedFile
                    ? `Last saved: ${new Date(
                        selectedFile.lastSaved
                      ).toLocaleString()}`
                    : 'Select or create a file to edit'}
                </CardDescription>
              </div>
              {isModified && (
                <Badge
                  variant='outline'
                  className='bg-yellow-500/10 text-yellow-500 border-yellow-500/20'>
                  Modified
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            {selectedFile ? (
              <>
                <div className='space-y-2'>
                  <Label htmlFor='file-content'>Content</Label>
                  <Textarea
                    id='file-content'
                    placeholder='Write your content here...'
                    value={currentContent}
                    onChange={(e) => setCurrentContent(e.target.value)}
                    rows={10}
                    className='font-mono'
                  />
                </div>

                <div className='space-y-2'>
                  <Label>Current Hash (SHA-256)</Label>
                  <div className='p-3 bg-muted rounded-md break-all font-mono text-xs'>
                    {currentHash}
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Stored Hash (SHA-256)</Label>
                  <div className='p-3 bg-muted rounded-md break-all font-mono text-xs'>
                    {selectedFile.hash}
                  </div>
                </div>

                {isModified && (
                  <div className='p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-md'>
                    <p className='text-sm text-yellow-500'>
                      ⚠️ File has been modified! The current hash doesn't match
                      the stored hash. Save to update.
                    </p>
                  </div>
                )}

                <Button
                  onClick={saveFile}
                  className='w-full'
                  disabled={!isModified}>
                  <Save className='h-4 w-4 mr-2' />
                  Save File
                </Button>
              </>
            ) : (
              <div className='flex items-center justify-center h-64 text-muted-foreground'>
                Select a file from the sidebar to start editing
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
