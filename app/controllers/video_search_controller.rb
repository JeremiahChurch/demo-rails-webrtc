class VideoSearchController < ApplicationController
  def index
    v = Yt::Collections::Videos.new
    @videos = v.where(q: query + ' karaoke', order: 'relevance', video_embeddable: true).take(20)
  end

  private

  def query
    params[:q]
  end
end
