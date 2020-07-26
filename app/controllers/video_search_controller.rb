class VideoSearchController < ApplicationController
  def index
    v = Yt::Collections::Videos.new
    @videos = v.where(q: query + ' karaoke', order: 'relevance', video_embeddable: true, max_results: 10).take(10)
  end

  private

  def query
    params[:q]
  end
end
