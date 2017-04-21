class AddColumnMessages < ActiveRecord::Migration
  def change
    add_column :messages, :to_user_id, :int
    add_column :messages, :from_user_id, :int
    remove_column :messages, :user_id, :int
  end
end
