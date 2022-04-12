class Post {
  final String subreddit;
  final String title;
  final int upvote;
  final String url;
  final String author;
  final bool isvideo;
  final bool isself;
  String? next;

  Post({
    required this.subreddit,
    required this.title,
    required this.upvote,
    required this.url,
    required this.author,
    required this.isvideo,
    required this.isself,
    this.next,
  });
}
