title Software Word

users [icon: user, color: blue] {
  id uuid pk
  full_name string
  email string
  hash_password string
  created_at timestamp
  updated_at timestamp
}

words [icon: wordpress, color: orange] {
  id uuid pk
  kanji string
  hiragana string
  meaning string
  jlpt_level string
  created_at timestamp
  updated_at timestamp
}

lessons [icon: book, color: green] {
  id uuid pk
  title string
  passage string
  grammar_point string
  grammar_explain string
  order_index int
  created_at timestamp
  updated_at timestamp
}

lesson_words [icon: aws-lake-formation, color: purple] {
  id uuid pk
  lesson_id uuid
  word_id uuid
  order_index int
}

study_logs [icon: log, color: yellow] {
  id uuid pk
  user_id uuid
  lesson_id uuid
  completed_at timestamp
}

// relations
study_logs.user_id > users.id
study_logs.lesson_id > lessons.id
lesson_words.lesson_id > lessons.id
lesson_words.word_id > words.id
