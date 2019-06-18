using isracart__yishaiHarniv.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace isracart__yishaiHarniv.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        //add item to session
        public JsonResult ToList()
        {
            if (Session["Bookmark"] == null)
            {
                Session["Bookmark"] = new List<GithubItemModel>();
            }

            return Json(Session["Bookmark"], JsonRequestBehavior.AllowGet);
        }

        //get items in session
        public void Post(GithubItemModel model)
        {
            var _list = (List<GithubItemModel>) Session["Bookmark"];

            _list.Add(model);

            Session["Bookmark"] = _list;
        }
    }

}