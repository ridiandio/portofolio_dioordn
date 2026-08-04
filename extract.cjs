const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\DIO\\.gemini\\antigravity-ide\\brain\\29d3384f-901c-4376-b005-7478e0075ad1\\.system_generated\\logs\\transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const data = JSON.parse(line);
      const str = JSON.stringify(data);
      if (str.includes('OptionWheel.jsx')) {
        // Look for code blocks or tool calls that might have it
        if (data.type === 'USER_INPUT' && data.content && data.content.includes('OptionWheel.jsx')) {
          console.log('--- USER INPUT FOUND ---');
          console.log(data.content);
        }
        if (data.tool_calls) {
          for (const call of data.tool_calls) {
            if (call.name === 'write_to_file' || call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
              if (JSON.stringify(call).includes('OptionWheel.jsx')) {
                console.log('--- TOOL CALL FOUND ---');
                console.log(JSON.stringify(call, null, 2));
              }
            }
          }
        }
      }
    } catch (e) {}
  }
}

processLineByLine();
