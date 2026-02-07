namespace EducationalPlatform.API.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Content { get; set; }

        // Added: video for each lesson
        public string? VideoUrl { get; set; }

        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}
