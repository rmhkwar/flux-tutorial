class AddColumnToFriendship < ActiveRecord::Migration
  def change
    add_column :friendships, :to_user_id, :int
    add_column :friendships, :from_user_id, :int
    remove_column :friendships, :user_id, :int
  end
end
