using Microsoft.AspNetCore.Mvc;
using MyBackend.Services;

namespace MyBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LawsController : ControllerBase
    {
        private readonly LawService _lawService;

        public LawsController(LawService lawService)
        {
            _lawService = lawService;
        }

        // GET: api/laws
        [HttpGet]
        public IActionResult GetAllLaws()
        {
            return Ok(_lawService.GetLaws());
        }

        // GET: api/laws/{citeType}
        [HttpGet("{citeType}")]
        public IActionResult GetLawByCiteType(string citeType)
        {
            var law = _lawService.GetLaw(citeType);
            if (law == null)
            {
                return NotFound($"No law found for citeType: {citeType}");
            }
            return Ok(law);
        }
    }
}