-- Run this in Supabase SQL Editor to clear all tables
-- This forces the app to start fresh with a clean database

TRUNCATE TABLE ds_tasks;
TRUNCATE TABLE ds_conf;
TRUNCATE TABLE ds_invoices;
TRUNCATE TABLE ds_payments;

-- Also reset sequences if any
-- Confirm tables are empty
SELECT 'ds_tasks' as table_name, COUNT(*) as rows FROM ds_tasks
UNION ALL
SELECT 'ds_conf', COUNT(*) FROM ds_conf
UNION ALL
SELECT 'ds_invoices', COUNT(*) FROM ds_invoices
UNION ALL
SELECT 'ds_payments', COUNT(*) FROM ds_payments;
