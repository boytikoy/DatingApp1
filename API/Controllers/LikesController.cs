using System.Drawing;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        public LikesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _uow.UserRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _uow.LikesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();
            if (sourceUser.UserName == username)
            {
                return BadRequest("You cannot like yourself");
            }

            var userLike = await _uow.LikesRepository.GetUserLike(sourceUserId, likedUser.Id);
            if (userLike != null) return BadRequest("You already like this user");
            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = likedUser.Id
            };
            sourceUser.LikedUsers.Add(userLike);

            if (await _uow.Complete()) return Ok();
            return BadRequest("Failed to like user");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<LikeDto>>> GetUserLikes([FromQuery] LikesParams likesParams)
        {

            likesParams.UserId = User.GetUserId();
            var users = await _uow.LikesRepository.GetUserLikes(likesParams);
            Response.AddPaginationheader(new PaginationHeader(users.CurrentPage, users.TotalCount, users.PageSize, users.TotalPages));
            return Ok(users);
        }

        [HttpDelete("{username}")]
        public async Task<IActionResult> RemoveLike(string username)
        {
            int sourceUserId = User.GetUserId();

            var likedUser = await _uow.UserRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _uow.LikesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            var userLike = await _uow.LikesRepository.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike == null) return BadRequest("You haven't liked this user");

            var toRemove = sourceUser.LikedUsers
                .FirstOrDefault(x => x.TargetUserId == likedUser.Id);
            sourceUser.LikedUsers.Remove(toRemove);

            if (await _uow.Complete()) return Ok();

            return BadRequest("Failed to remove liked user");
        }


    }
}