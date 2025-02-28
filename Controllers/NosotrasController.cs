using Microsoft.AspNetCore.Mvc;

namespace WebLota.Controllers
{
    public class NosotrasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
