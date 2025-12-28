-- Khan Waheed & Co. AI Tax Assistant Database Schema
-- PostgreSQL Schema for Vercel Postgres or Neon

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) NOT NULL,
    jurisdiction VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT unique_session_id UNIQUE (session_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

-- Generated forms table
CREATE TABLE IF NOT EXISTS generated_forms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    form_type VARCHAR(100) NOT NULL,
    form_data JSONB NOT NULL,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT fk_conversation_form FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at ASC);
CREATE INDEX IF NOT EXISTS idx_generated_forms_conversation_id ON generated_forms(conversation_id);
CREATE INDEX IF NOT EXISTS idx_generated_forms_created_at ON generated_forms(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_conversations_updated_at 
    BEFORE UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE conversations IS 'Stores user conversation sessions with jurisdiction information';
COMMENT ON TABLE messages IS 'Stores individual messages within conversations';
COMMENT ON TABLE generated_forms IS 'Stores generated tax forms and their data';
COMMENT ON COLUMN conversations.session_id IS 'Unique session identifier for tracking user sessions';
COMMENT ON COLUMN conversations.jurisdiction IS 'Tax jurisdiction: USA, Canada, KSA, or Pakistan';
COMMENT ON COLUMN messages.role IS 'Message role: user, assistant, or system';
COMMENT ON COLUMN generated_forms.form_type IS 'Type of tax form generated (e.g., Form 1040, T1, etc.)';
