using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineMedicalStore.Data; 

namespace OnlineMedicalStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        // private static List<User> _User = new List<User>
        // {
        //     new User{ UserID = 1001, UserEmail="prakash@gmail.com", UserPassword = "191101", UserPhone = "9361415123", WalletBalance = 1000},
        //     new User{ UserID = 1002, UserEmail="leomessi@gmail.com", UserPassword = "101010", UserPhone = "9486714120", WalletBalance = 1000}
        // };

        //GET: api/User
        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbContext.users);
        }

        //GET: api/User/1001
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //Adding a new user
        //POST: api/user
        [HttpPost]
        public IActionResult PostUser([FromBody] User user)
        {
            _dbContext.users.Add(user);
            //You might want to return CreatedAtAction pr another appropriate response
            return Ok();
        }

        //updating an existing user
        //PUT: api/User/1001
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] User user)
        {
            var userOld = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if(userOld == null)
            {
                return NotFound();
            }
            userOld.UserEmail = user.UserEmail;
            userOld.UserPassword = user.UserPassword;
            userOld.UserPhone = user.UserPhone;
            userOld.WalletBalance = user.WalletBalance;
            _dbContext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing user
        //DELETE: api/User/1001
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.UserID == id);
            if(user == null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            //you might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}