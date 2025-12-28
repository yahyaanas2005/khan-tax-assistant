import sql from "@/app/api/utils/sql";

// Save a new message
export async function POST(request) {
  try {
    const { conversationId, role, content } = await request.json();

    if (!conversationId || !role || !content) {
      return Response.json(
        { error: "Conversation ID, role, and content are required" },
        { status: 400 },
      );
    }

    if (!["user", "assistant", "system"].includes(role)) {
      return Response.json({ error: "Invalid role" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO messages (conversation_id, role, content, created_at)
      VALUES (${conversationId}, ${role}, ${content}, NOW())
      RETURNING *
    `;

    // Update conversation's updated_at timestamp
    await sql`
      UPDATE conversations 
      SET updated_at = NOW()
      WHERE id = ${conversationId}
    `;

    return Response.json(result[0]);
  } catch (error) {
    console.error("Error saving message:", error);
    return Response.json({ error: "Failed to save message" }, { status: 500 });
  }
}
