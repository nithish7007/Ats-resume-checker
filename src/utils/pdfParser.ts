// Enhanced PDF Text Extraction Utility
// Works directly in browser without external libraries

export async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Convert to text for pattern matching
        let pdfText = '';
        for (let i = 0; i < uint8Array.length; i++) {
          pdfText += String.fromCharCode(uint8Array[i]);
        }
        
        let extractedText = '';
        
        // Method 1: Extract from stream objects
        const streamPattern = /stream\s*([\s\S]*?)\s*endstream/g;
        let streamMatch;
        
        while ((streamMatch = streamPattern.exec(pdfText)) !== null) {
          const streamContent = streamMatch[1];
          
          // Try to extract readable text from stream
          let readable = '';
          for (let i = 0; i < streamContent.length; i++) {
            const char = streamContent.charCodeAt(i);
            if ((char >= 32 && char <= 126) || char === 10 || char === 13) {
              readable += streamContent[i];
            }
          }
          extractedText += readable + ' ';
        }
        
        // Method 2: Look for text in parentheses (common PDF text format)
        const textPattern = /\(([^)]+)\)/g;
        let textMatch;
        const textParts: string[] = [];
        
        while ((textMatch = textPattern.exec(pdfText)) !== null) {
          let text = textMatch[1];
          
          // Skip if it looks like a PDF command
          if (text.length < 2 || /^[\/\[\]<>]/.test(text)) continue;
          
          // Decode common PDF escape sequences
          text = text
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\\(/g, '(')
            .replace(/\\\)/g, ')')
            .replace(/\\\\/g, '\\');
          
          // Filter out non-readable content
          if (/[a-zA-Z0-9@.,\-:;'\s]/.test(text)) {
            textParts.push(text);
          }
        }
        
        if (textParts.length > 0) {
          extractedText = textParts.join(' ');
        }
        
        // Method 3: Extract all printable ASCII as fallback
        if (extractedText.length < 100) {
          extractedText = '';
          let consecutiveReadable = '';
          
          for (let i = 0; i < uint8Array.length; i++) {
            const char = uint8Array[i];
            
            if ((char >= 32 && char <= 126) || char === 10 || char === 13 || char === 9) {
              consecutiveReadable += String.fromCharCode(char);
            } else {
              if (consecutiveReadable.length > 3) {
                extractedText += consecutiveReadable;
              }
              consecutiveReadable = '';
            }
          }
          
          if (consecutiveReadable.length > 3) {
            extractedText += consecutiveReadable;
          }
        }
        
        // Clean up the extracted text
        extractedText = extractedText
          // Remove PDF operators and commands
          .replace(/\/[A-Za-z]+/g, ' ')
          .replace(/\d+\s+\d+\s+obj/g, '')
          .replace(/endobj/g, '')
          .replace(/stream/g, '')
          .replace(/endstream/g, '')
          .replace(/xref/g, '')
          .replace(/trailer/g, '')
          .replace(/startxref/g, '')
          .replace(/%%EOF/g, '')
          // Remove numbers that are likely PDF coordinates
          .replace(/\b\d+\.\d+\s+\d+\.\d+\b/g, ' ')
          // Clean up whitespace
          .replace(/\s+/g, ' ')
          .trim();
        
        // Split into sentences and clean
        const sentences = extractedText
          .split(/[.\n]/)
          .map(s => s.trim())
          .filter(s => {
            // Keep sentences that have actual words
            return s.length > 5 && /[a-zA-Z]{3,}/.test(s);
          });
        
        const finalText = sentences.join('\n').trim();
        
        // Check if we got meaningful content
        if (finalText.length < 50) {
          resolve(getHelpfulMessage());
        } else {
          resolve(finalText);
        }
        
      } catch (err) {
        console.error('PDF parsing error:', err);
        resolve(getHelpfulMessage());
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

function getHelpfulMessage(): string {
  return `Hi! I need your help to load your resume.

I tried to extract text from your PDF, but it seems to have limited readable content.

Here are 3 easy ways to get your resume into the editor:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ OPTION 1: Copy & Paste (EASIEST - 30 seconds)
   
   1. Open your PDF resume in any PDF reader
   2. Select all text (Ctrl+A or Cmd+A)
   3. Copy (Ctrl+C or Cmd+C)
   4. Click in this editor and paste (Ctrl+V or Cmd+V)
   
   ✓ Works with any PDF
   ✓ Takes 30 seconds
   ✓ 100% accurate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💾 OPTION 2: Convert to TXT (BEST QUALITY)
   
   1. Open your PDF in Adobe Reader or browser
   2. File → Save As → Text (.txt)
   3. Click "Upload Resume" button
   4. Select the .txt file
   
   ✓ Perfect extraction
   ✓ All formatting preserved
   ✓ Easy to edit

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 OPTION 3: Online Converter (IF NO PDF READER)
   
   1. Go to: ilovepdf.com/pdf_to_text
   2. Upload your PDF
   3. Download the TXT file
   4. Upload here using "Upload Resume" button
   
   ✓ Free online tool
   ✓ Works in browser
   ✓ No installation needed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⌨️ OPTION 4: Type It In
   
   Just start typing or pasting your resume below!
   Our real-time ATS scoring will help you as you go.
   
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHY THIS HAPPENS:

Your PDF might be:
• Scanned from paper (image-based, not text)
• Created with special software
• Password protected or encrypted
• Using complex formatting

Don't worry - this is common! Just use one of the options above.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👉 RECOMMENDED: Try Option 1 (Copy & Paste) - it's the fastest!

Clear this message and paste your resume below to get started with ATS scoring! 🚀`;
}
