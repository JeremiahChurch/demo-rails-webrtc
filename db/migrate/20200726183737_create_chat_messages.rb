class CreateChatMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :chat_messages do |t|
      t.integer :room_id
      t.string :user_name
      t.string :message

      t.timestamps
    end

    ChatMessage.create(user_name: 'Sally', message: 'Wow, you really hit that high note!')
    ChatMessage.create(user_name: 'Sally', message: "Can't wait to see what John sings")
    ChatMessage.create(user_name: 'John', message: "It won't compare to last week, but I'll try")
    ChatMessage.create(user_name: 'Emily', message: "Let's rock this song")
  end
end
