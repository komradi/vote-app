
class AddOptionsToPolls < ActiveRecord::Migration[7.2]
  def change
    add_column :polls, :options, :json, default: []
    
  end
end