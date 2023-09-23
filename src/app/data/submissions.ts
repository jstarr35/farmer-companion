export interface Submissions {
  kind: string
  data: Data
}

export interface Data {
  after: string
  dist: number
  modhash: string
  geo_filter: string
  children: Children[]
  before: any
}

export interface Children {
  kind: string
  data: ChildData
}

export interface ChildData {
  approved_at_utc: any
  subreddit: string
  selftext: string
  author_fullname: string
  saved: boolean
  mod_reason_title: any
  gilded: number
  clicked: boolean
  title: string
  link_flair_richtext: LinkFlairRichtext[]
  subreddit_name_prefixed: string
  hidden: boolean
  pwls: any
  link_flair_css_class: string
  downs: number
  thumbnail_height: number
  top_awarded_type: any
  hide_score: boolean
  name: string
  quarantine: boolean
  link_flair_text_color: string
  upvote_ratio: number
  author_flair_background_color: string
  ups: number
  total_awards_received: number
  media_embed: MediaEmbed
  thumbnail_width: number
  author_flair_template_id: any
  is_original_content: boolean
  user_reports: any[]
  secure_media: any
  is_reddit_media_domain: boolean
  is_meta: boolean
  category: any
  secure_media_embed: SecureMediaEmbed
  link_flair_text: string
  can_mod_post: boolean
  score: number
  approved_by: any
  is_created_from_ads_ui: boolean
  author_premium: boolean
  thumbnail: string
  edited: boolean
  author_flair_css_class: any
  author_flair_richtext: any[]
  gildings: Gildings
  post_hint?: string
  content_categories: any
  is_self: boolean
  subreddit_type: string
  created: number
  link_flair_type: string
  wls: any
  removed_by_category?: string
  banned_by: any
  author_flair_type: string
  domain: string
  allow_live_comments: boolean
  selftext_html: any
  likes?: boolean
  suggested_sort: string
  banned_at_utc: any
  url_overridden_by_dest: string
  view_count: any
  archived: boolean
  no_follow: boolean
  is_crosspostable: boolean
  pinned: boolean
  over_18: boolean
  preview?: Preview
  all_awardings: AllAwarding[]
  awarders: any[]
  media_only: boolean
  link_flair_template_id: string
  can_gild: boolean
  spoiler: boolean
  locked: boolean
  author_flair_text: string
  treatment_tags: any[]
  visited: boolean
  removed_by: any
  mod_note: any
  distinguished: any
  subreddit_id: string
  author_is_blocked: boolean
  mod_reason_by: any
  num_reports: any
  removal_reason: any
  link_flair_background_color: string
  id: string
  is_robot_indexable: boolean
  report_reasons: any
  author: string
  discussion_type: any
  num_comments: number
  send_replies: boolean
  whitelist_status: any
  contest_mode: boolean
  mod_reports: any[]
  author_patreon_flair: boolean
  author_flair_text_color: string
  permalink: string
  parent_whitelist_status: any
  stickied: boolean
  url: string
  subreddit_subscribers: number
  created_utc: number
  num_crossposts: number
  media: any
  is_video: boolean
}

export interface LinkFlairRichtext {
  e: string
  t: string
}

export interface MediaEmbed {}

export interface SecureMediaEmbed {}

export interface Gildings {}

export interface Preview {
  images: Image[]
  enabled: boolean
}

export interface Image {
  source: Source
  resolutions: Resolution[]
  variants: Variants
  id: string
}

export interface Source {
  url: string
  width: number
  height: number
}

export interface Resolution {
  url: string
  width: number
  height: number
}

export interface Variants {}

export interface AllAwarding {
  giver_coin_reward: any
  subreddit_id: any
  is_new: boolean
  days_of_drip_extension: any
  coin_price: number
  id: string
  penny_donate: any
  award_sub_type: string
  coin_reward: number
  icon_url: string
  days_of_premium: any
  tiers_by_required_awardings: any
  resized_icons: ResizedIcon[]
  icon_width: number
  static_icon_width: number
  start_date: any
  is_enabled: boolean
  awardings_required_to_grant_benefits: any
  description: string
  end_date: any
  sticky_duration_seconds: any
  subreddit_coin_reward: number
  count: number
  static_icon_height: number
  name: string
  resized_static_icons: ResizedStaticIcon[]
  icon_format: string
  icon_height: number
  penny_price: number
  award_type: string
  static_icon_url: string
}

export interface ResizedIcon {
  url: string
  width: number
  height: number
}

export interface ResizedStaticIcon {
  url: string
  width: number
  height: number
}
