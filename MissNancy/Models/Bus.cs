﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class Bus : MissNancyDB.Record<Bus>
    {
        public static Page<Bus> GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = repo.Page<Bus>(page, limit, "WHERE (abs(Active) = 1) OR (abs(Active) = @0)", activeOnly);

            // can't sort in SQL because RouteDisplay is a ResultColumn
            data.Items.Sort((a, b) => String.Compare(a.RouteDisplay, b.RouteDisplay));

            return data;
        }

        // The display value of for the Route
        [PetaPoco.ResultColumn]
        public string RouteDisplay
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT RouteDisplay FROM tblRoutes")
                    .Append("WHERE BusKey=@0", this.BusKey);

                return repo.ExecuteScalar<string>(sql);
            }
        }

        // The display value of for the BusDriverKey
        [PetaPoco.ResultColumn]
        public string BusDriver
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblWorkers.LastName + ', ' + tblWorkers.FirstName FROM tblWorkers ")
                    .Append("WHERE WorkerKey=@0", this.BusDriverKey);

                return repo.ExecuteScalar<string>(sql);
            }
        }

        // The display value of for the Captain
        [PetaPoco.ResultColumn]
        public string Captain
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblWorkers.LastName + ', ' + tblWorkers.FirstName FROM tblBuses INNER JOIN ")
                    .Append("tblRoutes ON tblBuses.BusKey = tblRoutes.BusKey INNER JOIN")
                    .Append("tblWorkers ON tblRoutes.BusCaptainKey = tblWorkers.WorkerKey")
                    .Append("WHERE tblBuses.BusKey=@0", this.BusKey);

                return repo.ExecuteScalar<string>(sql);
            }
        }

        // the current number of children assigned to this class
        [PetaPoco.ResultColumn]
        public string Current
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT Count(tblChildren.ChildrenKey)")
                    .Append("FROM tblNeighborhoods INNER JOIN tblChildren")
                    .Append("ON tblNeighborhoods.NeighborhoodKey = tblChildren.NeighborhoodKey")
                    .Append("WHERE (((tblChildren.NeighborhoodKey)=@0))", this.BusKey)
                    .Append("GROUP BY tblNeighborhoods.RouteKey");

                return repo.ExecuteScalar<string>(sql);
            }
        }

        [PetaPoco.ResultColumn]
        public IList<BusWorkerDetail> BusWorkerDetails { get; set; }

        public List<BusWorkerDetail> GetWorkers(int busKey)
        {
            var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblBusWorkerDetails.BusWorkerKey, tblBusWorkerDetails.BusKey,")
                    .Append("tblBusWorkerDetails.WorkerKey, tblBusWorkerDetails.CreateDate,")
                    .Append("tblBusWorkerDetails.CreatedBy, tblBusWorkerDetails.EditDate,")
                    .Append("tblBusWorkerDetails.EditedBy, tblWorkers.LastName, tblWorkers.FirstName, tblWorkers.Phone, tblWorkers.Mobile")
                    .Append("FROM tblBusWorkerDetails")
                    .Append("INNER JOIN tblWorkers ON tblBusWorkerDetails.WorkerKey = tblWorkers.WorkerKey")
                    .Append("WHERE tblBusWorkerDetails.BusKey = @0", busKey)
                    .Append("ORDER BY tblWorkers.LastName, tblWorkers.FirstName");

            var workers = repo.Query<BusWorkerDetail>(sql).ToList();

            return workers;
        }
    }
}