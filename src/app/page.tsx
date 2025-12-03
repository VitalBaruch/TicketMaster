"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import { DataTable } from "@/components/ui/DataTable";

const columns = [
  { key: "name", header: "שם" },
  { key: "type", header: "סוג" },
  { key: "status", header: "סטטוס" },
];

const rows = [
  { name: "דף נחיתה לקמפיין", type: "Landing Page", status: "רעיון" },
  { name: "מערכת מתכונים", type: "Web App", status: "בפיתוח" },
  { name: "אתר תדמית ללקוח", type: "Business Site", status: "על האוויר" },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Vital Starter Template 🚀</h1>
        <p className="text-sm text-slate-300">
          תבנית התחלה מהירה ל־Next.js. מפה אתה משכפל לכל רעיון חדש, משנה טקסטים
          ומתחיל לפתח.
        </p>

        <div className="flex gap-3 flex-wrap">
          <Button onClick={() => alert("מתחילים פרויקט חדש!")}>
            התחל פרויקט חדש
          </Button>
          <Button variant="outline">ערוך את התבנית</Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4 items-start">
        <Card title="מה כבר מחכה לך כאן?">
          <ul className="list-disc list-inside space-y-1">
            <li>Navbar + Sidebar מוכנים</li>
            <li>קומפוננטות Button, Card</li>
            <li>טופס יצירת קשר לדוגמה</li>
            <li>טבלת נתונים גנרית</li>
            <li>מבנה RTL מותאם לעברית</li>
          </ul>
        </Card>

        <ContactForm />
      </section>

      <section className="space-y-3" id="table">
        <h2 className="text-lg font-semibold">טבלת רעיונות לדוגמה</h2>
        <DataTable
          columns={columns}
          rows={rows}
          caption="אפשר למחזר את הטבלה הזו לכל נתונים שתרצה."
        />
      </section>
    </div>
  );
}
