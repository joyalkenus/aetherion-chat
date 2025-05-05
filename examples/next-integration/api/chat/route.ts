import { NextRequest, NextResponse } from 'next/server';

// Sample response function - replace with your actual AI/API service
function generateResponse(message: string): string {
  const responses = [
    `Thank you for your message: "${message}". I'm here to help!`,
    `# Response to your query\n\nYou asked: "${message}"\n\nHere's what I found:`,
    `## Interesting question!\n\nRegarding "${message}", here are some key points:\n\n- Point 1\n- Point 2\n- Point 3`,
    `Let me help you with "${message}"\n\n\`\`\`js\n// Here's a code example\nconst answer = "This is a sample response";\nconsole.log(answer);\n\`\`\``,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Add artificial delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate response (replace with your actual AI service)
    const responseText = generateResponse(message);
    
    return NextResponse.json({
      response: responseText,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 