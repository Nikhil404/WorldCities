using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WorldCities.Data.Models
{
    public class City
    {
        #region Constructor
        public City()
        {
                
        }
        #endregion

        #region Properties
        /// <summary>
        /// The Unique id and primary key for city
        /// </summary>
        [Key]
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// City Name(in UTF8 Format)
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///  City Name(in ASCII Format)
        /// </summary>
        public string Name_ASCII { get; set; }

        /// <summary>
        /// City Latitude
        /// </summary>
        [Column(TypeName = "decimal(7,4)")]
        public decimal Lat { get; set; }

        /// <summary>
        /// City Logitude
        /// </summary>
        [Column(TypeName = "decimal(7,4)")]
        public decimal Lon { get; set; }

        /// <summary>
        /// CountryId(foreign Key)
        /// </summary>
        [ForeignKey("Country")]
        public int CountryId { get; set; }
        #endregion

        #region Navigation Properties
        /// <summary>
        /// The Country related to city
        /// </summary>
        public virtual Country Country { get; set; }
        #endregion

    }
}
