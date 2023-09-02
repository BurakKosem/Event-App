using EventApp.Core.Logging;
using EventApp.Entities;
using EventApp.Entities.DTOs;
using EventApp.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EventApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(LogFilterAttribute))]

    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApiUser> _userManager;
        private readonly SignInManager<ApiUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<ApiUser> userManager, SignInManager<ApiUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto input)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newUser = new ApiUser();
                    newUser.Email = input.Email;
                    newUser.UserName = input.UserName;
                    newUser.FirstName = input.FirstName;
                    newUser.LastName = input.LastName;

                    var result = await _userManager.CreateAsync(newUser, input.Password);

                    if (result.Succeeded)
                    {
                        await _userManager.AddToRolesAsync(newUser, input.Roles);
                        return StatusCode(201, $"User '{newUser.UserName}' has been created.");
                    }
                    else
                    {
                        throw new Exception(string.Format("Error: {0}", string.Join(" ", result.Errors.Select(error => error.Description))));
                    }
                }
                else
                {
                    return BadRequest("Lütfen bilgilerinizi doğru girin");
                }
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto input)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _userManager.FindByNameAsync(input.UserName);
                    if(user == null || !await _userManager.CheckPasswordAsync(user, input.Password))
                    {
                        throw new Exception("Lütfen bilgilerinizi doğru girin.");
                    }
                    else
                    {
                        var signingCredentials = new SigningCredentials(     
                            new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(
                                    _configuration["JWT:SigningKey"])),
                                SecurityAlgorithms.HmacSha256);

                        var userId = await _userManager.GetUserIdAsync(user);
                        var claims = new List<Claim>();
                        claims.Add(new Claim(ClaimTypes.Name, user.UserName));
                        claims.Add(new Claim(ClaimTypes.NameIdentifier, userId));
                        claims.AddRange(
                            (await _userManager.GetRolesAsync(user))
                            .Select(userRole => new Claim(ClaimTypes.Role, userRole)));




                        var jwtObject = new JwtSecurityToken(                
                            issuer: _configuration["JWT:Issuer"],
                            audience: _configuration["JWT:Audience"],
                            claims: claims,
                            expires: DateTime.Now.AddSeconds(300),
                            signingCredentials: signingCredentials);

                        var jwtString = new JwtSecurityTokenHandler()        
                            .WriteToken(jwtObject);

                        return StatusCode(                                   
                        StatusCodes.Status200OK, jwtString);
                    }
                }
                else
                {
                    return BadRequest("Lütfen bilgilerinizi doğru girin");
                }
            }
            catch (Exception ex)
            {
                var exceptionDetails = new ProblemDetails();
                exceptionDetails.Detail = ex.Message;
                exceptionDetails.Status =
                    StatusCodes.Status401Unauthorized;
                exceptionDetails.Type =
                        "https://tools.ietf.org/html/rfc7231#section-6.6.1";
                return StatusCode(
                    StatusCodes.Status401Unauthorized,
                    exceptionDetails);
            }
        }
    }
}
