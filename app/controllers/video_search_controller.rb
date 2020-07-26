class VideoSearchController < ApplicationController
  def index
    v = Yt::Collections::Videos.new
    @videos = v.where(q: query + ' karaoke', order: 'relevance', video_embeddable: true).take(5)
    # part: 'snippet, contentDetails', fields: 'items(id,snippet(title,publishedAt, thumbnails), contentDetails(duration))'
  end

  private

  def query
    params[:q]
  end
end
