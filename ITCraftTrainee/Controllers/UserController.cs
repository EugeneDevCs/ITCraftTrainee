using ITCraftTrainee.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITCraftTrainee.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : Controller
    {
        ApplicationContext db;
        public UserController(ApplicationContext context)
        {
            db = context;
            if (!db.Users.Any())
            {
                db.Users.Add(new User { Name = "Tanyia",  Active = false });
                db.Users.Add(new User { Name = "Igor", Active = false });
                db.Users.Add(new User { Name = "Eugene", Active = false });
                db.Users.Add(new User { Name = "Tanyia", Active = false });
                db.Users.Add(new User { Name = "Igor", Active = false });
                db.Users.Add(new User { Name = "Olga", Active = false });
                db.Users.Add(new User { Name = "Victor", Active = false });
                db.Users.Add(new User { Name = "Igor", Active = false });
                db.Users.Add(new User { Name = "Eugene", Active = false });
                db.Users.Add(new User { Name = "Nikolay", Active = false });
                db.SaveChanges();
            }
        }
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return db.Users.ToList();
        }

        [HttpGet("{id}")]
        public User Get(int id)
        {
            User User = db.Users.FirstOrDefault(x => x.Id == id);
            return User;
        }

        [HttpPost]
        public IActionResult Post(User User)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(User);
                db.SaveChanges();
                return Ok(User);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(User User)
        {
            if (ModelState.IsValid)
            {
                db.Update(User);
                db.SaveChanges();
                return Ok(User);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            User User = db.Users.FirstOrDefault(x => x.Id == id);
            if (User != null)
            {
                db.Users.Remove(User);
                db.SaveChanges();
            }
            return Ok(User);
        }
    }
}
