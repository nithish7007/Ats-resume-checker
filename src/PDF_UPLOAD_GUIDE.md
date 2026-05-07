# PDF Upload Feature - Complete Guide

## 🎉 What's New

The Live Resume Editor now supports **PDF uploads**! You can now upload PDF resumes, extract the text automatically, edit them, and download in multiple formats.

## 📦 Installation Required

To enable PDF upload, you need to install the `pdfjs-dist` package:

### Step 1: Open Terminal in VS Code
Press `Ctrl + ` ` (backtick) or go to **View → Terminal**

### Step 2: Install PDF.js Library
```bash
npm install pdfjs-dist
```

### Step 3: Verify Installation
Check your `package.json` file. You should see:
```json
{
  "dependencies": {
    "pdfjs-dist": "^3.x.x",
    ...
  }
}
```

## 🗂️ Files Added/Updated

### New File: `/utils/pdfParser.ts`
This file handles PDF text extraction using the PDF.js library.

**What it does:**
- Reads PDF files as binary data
- Extracts text from each page
- Combines all pages into one text string
- Handles errors gracefully with fallback

### Updated File: `/components/LiveResumeEditor.tsx`
Enhanced with PDF upload capabilities.

**New features:**
- Accepts `.pdf` files in upload
- Shows loading state while processing PDF
- Extracts text and displays in editor
- Download as HTML (can be printed to PDF)

## 🚀 How to Use

### Upload PDF Resume:

1. **Click "Upload Resume" button**
2. **Select your PDF file** from your computer
3. **Wait 2-5 seconds** for processing (you'll see a loading message)
4. **Text appears in editor** automatically
5. **Edit as needed** with real-time ATS feedback

### Supported Upload Formats:
- ✅ **PDF** (.pdf) - Now supported!
- ✅ **Text** (.txt)
- ✅ **Word** (.doc, .docx)

### Download Formats:
- ✅ **TXT** - Plain text format
- ✅ **DOC** - Microsoft Word format
- ✅ **HTML** - Can be printed to PDF from browser

## 🔧 Technical Details

### How PDF Parsing Works:

1. **File Upload**
   ```
   User selects PDF → File object created
   ```

2. **Array Buffer Conversion**
   ```
   PDF File → ArrayBuffer (binary data)
   ```

3. **PDF.js Processing**
   ```
   ArrayBuffer → PDF Document → Pages → Text Items
   ```

4. **Text Extraction**
   ```
   Each page processed → Text combined → Display in editor
   ```

### Code Flow:

```typescript
// 1. User uploads PDF
handleFileUpload(file)
  ↓
// 2. Check if PDF
if (file.type === 'application/pdf')
  ↓
// 3. Extract text
extractTextFromPDF(file)
  ↓
// 4. Display in editor
setResumeText(extractedText)
```

## 📝 Complete Workflow Example

```
1. Upload: my_resume.pdf
         ↓
2. Processing: "Extracting text from PDF..."
         ↓
3. Text appears in editor
         ↓
4. Edit resume with real-time feedback
         ↓
5. ATS score updates from 52 → 78
         ↓
6. Download as my_resume_edited.doc
         ↓
7. Ready for job applications! ✅
```

## 🎨 UI Updates

### Loading State
When uploading PDF, you'll see:
- Yellow banner with spinning icon
- Message: "Processing your resume... This may take a few seconds."
- Upload button disabled during processing

### File Indicator
After successful upload:
- Blue banner showing filename
- Example: "Editing: john_doe_resume.pdf"

### Action Buttons
**Updated buttons:**
- 🔵 **Upload Resume** - Now accepts PDF
- 🟢 **Download TXT** - Save as plain text
- 🟣 **Download DOC** - Save as Word document
- 🟠 **Save as HTML** - Save as HTML (can print to PDF)
- 🔴 **Clear** - Clear all content

## ⚙️ Configuration

### PDF.js Worker Configuration

The PDF.js library needs a worker file. It's automatically loaded from CDN:

```typescript
pdfjsLib.GlobalWorkerOptions.workerSrc = 
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
```

**What this means:**
- No additional setup required
- Worker loads from CDN automatically
- Works offline after first load (cached)

### Fallback Method

If PDF.js fails, a fallback method attempts basic text extraction:
- Reads PDF as text (limited success)
- Shows error message if extraction fails
- Suggests converting PDF to TXT format

## 🐛 Troubleshooting

### Issue 1: "Cannot find module 'pdfjs-dist'"

**Solution:**
```bash
npm install pdfjs-dist
```

### Issue 2: PDF text not extracting properly

**Possible causes:**
- PDF is image-based (scanned document)
- PDF has security restrictions
- PDF uses unusual encoding

**Solutions:**
1. Use Adobe Acrobat to save as "Text Accessible PDF"
2. Use online PDF to TXT converter first
3. Retype resume in the editor manually

### Issue 3: "Processing..." message stuck

**Solution:**
- Refresh the page
- Try a different PDF file
- Check browser console for errors (F12)
- File might be too large (keep under 5MB)

### Issue 4: Extracted text is garbled

**Cause:** PDF uses special fonts or encoding

**Solutions:**
1. Export PDF as plain text from your PDF reader
2. Upload the .txt file instead
3. Copy-paste text manually into editor

## 💡 Best Practices

### For Best PDF Upload Results:

1. **Use text-based PDFs** (not scanned images)
2. **Keep file size under 5MB**
3. **Avoid password-protected PDFs**
4. **Use standard fonts** (Arial, Calibri, Times New Roman)
5. **Simple formatting** works best

### Creating ATS-Friendly PDFs:

When downloading as HTML and printing to PDF:
1. Open the downloaded HTML file in Chrome/Edge
2. Press `Ctrl + P` (Print)
3. Select "Save as PDF" as printer
4. Settings:
   - Layout: Portrait
   - Margins: Default
   - Scale: 100%
5. Click "Save"

## 🔐 Privacy & Security

### Your Data is Safe:

- ✅ **All processing happens in your browser**
- ✅ **No files uploaded to servers**
- ✅ **No data stored or tracked**
- ✅ **Completely client-side**
- ✅ **Safe for sensitive information**

### How It Works:
```
Your Computer → Browser Memory → PDF.js Processing → Text Display
(No network transmission except CDN for PDF.js worker)
```

## 📊 Performance

### Expected Processing Times:

| PDF Pages | Processing Time |
|-----------|----------------|
| 1 page    | 1-2 seconds    |
| 2-3 pages | 2-4 seconds    |
| 4-5 pages | 4-6 seconds    |
| 6+ pages  | 6-10 seconds   |

### File Size Limits:

- ✅ **Recommended:** Under 2MB
- ⚠️ **Maximum:** 5MB
- ❌ **Too large:** Over 5MB (may fail or be very slow)

## 🆕 New Dependencies

Your `package.json` should now include:

```json
{
  "dependencies": {
    "lucide-react": "^0.x.x",
    "pdfjs-dist": "^3.x.x",
    "react": "^18.x.x",
    "react-dom": "^18.x.x",
    ...
  }
}
```

## 📚 Additional Resources

### PDF.js Documentation:
- Official Docs: https://mozilla.github.io/pdf.js/
- GitHub: https://github.com/mozilla/pdf.js
- NPM Package: https://www.npmjs.com/package/pdfjs-dist

### How to Convert PDFs:
- **Adobe Acrobat**: File → Export To → Text
- **Google Drive**: Open PDF → File → Download → Plain Text
- **Online Tools**: 
  - https://www.ilovepdf.com/pdf_to_text
  - https://www.zamzar.com/convert/pdf-to-txt/

## ✨ Summary

### What You Can Do Now:

1. ✅ Upload PDF resumes
2. ✅ Auto-extract text from PDFs
3. ✅ Edit extracted text
4. ✅ Get real-time ATS feedback
5. ✅ Download in TXT, DOC, or HTML format
6. ✅ Print HTML to PDF from browser

### Quick Start:

```bash
# 1. Install PDF.js
npm install pdfjs-dist

# 2. Start app
npm start

# 3. Go to Live Resume Editor tab

# 4. Click Upload Resume

# 5. Select PDF file

# 6. Edit and download!
```

---

**Need Help?** Check the browser console (F12) for detailed error messages if PDF upload isn't working.

**Pro Tip:** For best results, save your resume as PDF using "Print to PDF" feature with standard fonts and simple formatting.
