using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace PepperAcademy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GPTController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<GPTController> _logger;

        public GPTController(ILogger<GPTController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost]
        public async Task<GptResponse> PostAsync(string studentName="Ben", string course="Math", string level= "Beginner", string theme="Batman") //string subject="2x2 digit multiplication"
        {
            // Set your OpenAI API credentials
            string apiKey = "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";
            string modelId = "gpt-3.5-turbo";


            // Set the prompt for the conversation
            string systemPrompt = "You are a " + "10" + " year old " + course + " Teacher";
            string line1 = "Create a lesson plan for " + "10" + " year olds studying " + course; // + " - " + subject + ".";
            string line2 = "Modify the lesson plan to incorporate a " + theme + " theme.";
            string prompt = line1 + line2;

            // Create an HTTP client
            using (var client = new HttpClient())
            {
                // Set the API endpoint and headers
                string endpoint = $"https://api.openai.com/v1/chat/completions";
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
                //client.DefaultRequestHeaders.Add("Content-Type", "application/json");

                // Create the request payload
                var requestBody = new
                {
                    model = modelId,
                    messages = new[]
                    {
                    new { role = "system", content = systemPrompt },
                    new { role = "user", content = prompt }
                }
                };

                // Convert the payload to JSON
                var json = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                // Send the API request
                var response = await client.PostAsync(endpoint, content);
                var responseJson = await response.Content.ReadAsStringAsync();

                // Parse the response
                dynamic responseData = Newtonsoft.Json.JsonConvert.DeserializeObject(responseJson);
                string reply = responseData.choices[0].message.content;

                // Display the model's reply
                Console.WriteLine("Model's reply: " + reply);

                return new GptResponse
                {
                    LearningPlan = reply
                };
            }
        }
    }
}
