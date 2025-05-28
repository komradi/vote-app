class Poll < ApplicationRecord
  has_many :votes, dependent: :destroy
end