CREATE DATABASE accidents;

\c accidents

CREATE USER cosc;
ALTER USER cosc WITH PASSWORD 'password';

CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;

-- Import CSV file here

ALTER TABLE public.crashes RENAME TO crashes_temp;

create table crashes
(
    crash_ref_number integer,
    crash_severity text,
    crash_year integer,
    crash_month text,
    crash_day_of_week text,
    crash_hour integer,
    crash_nature text,
    crash_type text,
    crash_longitude_gda94 numeric,
    crash_latitude_gda94 numeric,
    crash_street text,
    crash_street_intersecting text,
    loc_suburb text,
    loc_local_government_area text,
    loc_post_code integer,
    loc_police_division text,
    loc_police_district text,
    loc_police_region text,
    loc_queensland_transport_region text,
    loc_main_roads_region text,
    loc_abs_statistical_area_2 text,
    loc_abs_statistical_area_3 text,
    loc_abs_statistical_area_4 text,
    loc_abs_remoteness text,
    loc_state_electorate text,
    loc_federal_electorate text,
    crash_controlling_authority text,
    crash_roadway_feature text,
    crash_traffic_control text,
    crash_speed_limit text,
    crash_road_surface_condition text,
    crash_atmospheric_condition text,
    crash_lighting_condition text,
    crash_road_horiz_align text,
    crash_road_vert_align text,
    crash_dca_code integer,
    crash_dca_description text,
    crash_dca_group_description text,
    count_casualty_fatality integer,
    count_casualty_hospitalised integer,
    count_casualty_medicallytreated integer,
    count_casualty_minorinjury integer,
    count_casualty_total integer,
    count_unit_car integer,
    count_unit_motorcycle_moped integer,
    count_unit_truck integer,
    count_unit_bus integer,
    count_unit_bicycle integer,
    count_unit_pedestrian integer,
    count_unit_other integer,
    location_geometry_wgs84 geometry
);

INSERT INTO crashes (crash_ref_number, crash_severity, crash_year, crash_month, crash_day_of_week, crash_hour, crash_nature, crash_type, crash_longitude_gda94, crash_latitude_gda94, crash_street, crash_street_intersecting, loc_suburb, loc_local_government_area, loc_post_code, loc_police_division, loc_police_district, loc_police_region, loc_queensland_transport_region, loc_main_roads_region, loc_abs_statistical_area_2, loc_abs_statistical_area_3, loc_abs_statistical_area_4, loc_abs_remoteness, loc_state_electorate, loc_federal_electorate, crash_controlling_authority, crash_roadway_feature, crash_traffic_control, crash_speed_limit, crash_road_surface_condition, crash_atmospheric_condition, crash_lighting_condition, crash_road_horiz_align, crash_road_vert_align, crash_dca_code, crash_dca_description, crash_dca_group_description, count_casualty_fatality, count_casualty_hospitalised, count_casualty_medicallytreated, count_casualty_minorinjury, count_casualty_total, count_unit_car, count_unit_motorcycle_moped, count_unit_truck, count_unit_bus, count_unit_bicycle, count_unit_pedestrian, count_unit_other, location_geometry_wgs84) (
    SELECT
        crash_ref_number,
        crash_severity,
        crash_year,
        crash_month,
        crash_day_of_week,
        crash_hour,
        crash_nature,
        crash_type,
        crash_longitude_gda94,
        crash_latitude_gda94,
        crash_street,
        crash_street_intersecting,
        loc_suburb,
        loc_local_government_area,
        loc_post_code,
        loc_police_division,
        loc_police_district,
        loc_police_region,
        loc_queensland_transport_region,
        loc_main_roads_region,
        loc_abs_statistical_area_2,
        loc_abs_statistical_area_3,
        loc_abs_statistical_area_4,
        loc_abs_remoteness,
        loc_state_electorate,
        loc_federal_electorate,
        crash_controlling_authority,
        crash_roadway_feature,
        crash_traffic_control,
        crash_speed_limit,
        crash_road_surface_condition,
        crash_atmospheric_condition,
        crash_lighting_condition,
        crash_road_horiz_align,
        crash_road_vert_align,
        crash_dca_code,
        crash_dca_description,
        crash_dca_group_description,
        count_casualty_fatality,
        count_casualty_hospitalised,
        count_casualty_medicallytreated,
        count_casualty_minorinjury,
        count_casualty_total,
        count_unit_car,
        count_unit_motorcycle_moped,
        count_unit_truck,
        count_unit_bus,
        count_unit_bicycle,
        count_unit_pedestrian,
        count_unit_other,
        st_transform(st_setsrid(st_point(crash_latitude_gda94, crash_longitude_gda94), 4283), 4326)
    FROM temp_crashes
);

DROP TABLE temp_crashes;