namespace PepperAcademy.Controllers
{
    public class GptQuestionResponse
    {
        public GptQuestions[] Quiz { get; set; }
    }

    public class GptQuestions
    {
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}