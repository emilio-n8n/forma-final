-- FORMA Database Schema

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  agency_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can manage own profile"
  ON profiles FOR ALL USING (auth.uid() = id);

-- Conversations (chat historique)
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Nouvelle conversation',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can manage own conversations"
  ON conversations FOR ALL USING (auth.uid() = user_id);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  citations JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can manage own messages"
  ON messages FOR ALL USING (auth.uid() = user_id);

-- Projects (kanban)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('todo', 'in_progress', 'review', 'done')) DEFAULT 'todo',
  position INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can manage own projects"
  ON projects FOR ALL USING (auth.uid() = user_id);

-- Renders (image gen)
CREATE TABLE renders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  style TEXT,
  ambiance TEXT,
  weather TEXT,
  image_url TEXT,
  original_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE renders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can manage own renders"
  ON renders FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_renders_user_id ON renders(user_id);
