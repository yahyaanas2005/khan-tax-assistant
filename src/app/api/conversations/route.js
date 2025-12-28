import sql from "@/app/api/utils/sql";

// Create a new conversation
export async function POST(request) {
  try {
    const { sessionId, jurisdiction } = await request.json();

    if (!sessionId) {
      return Response.json(
        { error: "Session ID is required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO conversations (session_id, jurisdiction, created_at, updated_at)
      VALUES (${sessionId}, ${jurisdiction || null}, NOW(), NOW())
      RETURNING *
    `;

    return Response.json(result[0]);
  } catch (error) {
    console.error("Error creating conversation:", error);
    return Response.json(
      { error: "Failed to create conversation" },
      { status: 500 },
    );
  }
}

// Get conversation by session ID
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return Response.json(
        { error: "Session ID is required" },
        { status: 400 },
      );
    }

    const conversations = await sql`
      SELECT * FROM conversations 
      WHERE session_id = ${sessionId}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (conversations.length === 0) {
      return Response.json(null);
    }

    // Get messages for this conversation
    const messages = await sql`
      SELECT * FROM messages 
      WHERE conversation_id = ${conversations[0].id}
      ORDER BY created_at ASC
    `;

    return Response.json({
      ...conversations[0],
      messages,
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return Response.json(
      { error: "Failed to fetch conversation" },
      { status: 500 },
    );
  }
}
