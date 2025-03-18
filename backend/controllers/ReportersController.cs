using Microsoft.AspNetCore.Mvc;
using MyBackend.Services;

namespace MyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportersController : ControllerBase
    {
        private readonly ReportersService _reportersService;

        public ReportersController(ReportersService reportersService)
        {
            _reportersService = reportersService;
        }

        // GET: api/reporters
        [HttpGet]
        public IActionResult GetAllReporters()
        {
            return Ok(_reportersService.Reporters);
        }

        // GET: api/reporters/{key}
        [HttpGet("{key}")]
        public IActionResult GetReportersByKey(string key)
        {
            if (_reportersService.Reporters.TryGetValue(key, out var reporters))
            {
                return Ok(reporters);
            }
            return NotFound($"No reporters found for key: {key}");
        }
    }
}
