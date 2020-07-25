class CreatePlaylists < ActiveRecord::Migration[6.0]
  def change
    create_table :playlists do |t|
      t.integer :room_id
      t.string :video_id
      t.string :title
      t.string :user_name
      t.string :runtime
      t.string :thumbnail_url
      t.timestamps
    end
  end
end
