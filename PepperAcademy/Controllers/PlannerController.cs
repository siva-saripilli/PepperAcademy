using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace PepperAcademy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlannerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IEnumerable<LearningPlan>> PostAsync()
        {
            // Set your OpenAI API credentials
            string apiKey = "Key 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";
            string modelId = "gpt-3.5-turbo";

            // Set the prompt for the conversation
            string prompt = "What is the meaning of life?";

            // Create an HTTP client
            using (var client = new HttpClient())
            {
                // Set the API endpoint and headers
                string endpoint = $"https://api.openai.com/v1/chat/completions";
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
                client.DefaultRequestHeaders.Add("Content-Type", "application/json");

                // Create the request payload
                var requestBody = new
                {
                    model = modelId,
                    messages = new[]
                    {
                    new { role = "system", content = "You are a helpful assistant." },
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

                return null;
            }
        }
    }
}
